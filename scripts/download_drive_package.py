#!/usr/bin/env python3
"""
Downloads the complete real estate tracking case-study package from Google Drive
and stores it in public/assets/case-studies/ with exact folder structure.
"""

import os
import re
import json
import time
import urllib.request
import urllib.parse

USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

def get_folder_items(folder_id):
    """Fetches items inside a public Google Drive folder using _DRIVE_ivd parsing."""
    url = f'https://drive.google.com/drive/folders/{folder_id}'
    req = urllib.request.Request(url, headers={'User-Agent': USER_AGENT})
    try:
        html = urllib.request.urlopen(req, timeout=20).read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Error fetching folder {folder_id}: {e}")
        return []

    m = re.search(r"_DRIVE_ivd'\]\s*=\s*'([^']+)'", html)
    if not m:
        print(f"No _DRIVE_ivd in {folder_id}")
        return []

    raw = m.group(1).encode('utf-8').decode('unicode_escape')
    try:
        data = json.loads(raw)
    except Exception as e:
        print(f"Error parsing JSON for {folder_id}: {e}")
        return []

    items = data[0] if isinstance(data, list) and len(data) > 0 and isinstance(data[0], list) else data
    result = []
    if isinstance(items, list):
        for it in items:
            if isinstance(it, list) and len(it) > 3:
                fid = it[0]
                fname = it[2]
                fmime = it[3]
                result.append({'id': fid, 'name': fname, 'mime': fmime})
    return result

def download_file(file_id, dest_path):
    """Downloads a file from Google Drive usercontent endpoint."""
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 0:
        print(f"Already exists: {dest_path} ({os.path.getsize(dest_path)} bytes)")
        return True

    download_urls = [
        f'https://drive.usercontent.google.com/download?id={file_id}&export=download',
        f'https://drive.google.com/uc?export=download&id={file_id}',
        f'https://docs.google.com/uc?export=download&id={file_id}'
    ]

    for url in download_urls:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': USER_AGENT})
            with urllib.request.urlopen(req, timeout=30) as resp:
                content = resp.read()
                if len(content) > 0:
                    with open(dest_path, 'wb') as f:
                        f.write(content)
                    print(f"Downloaded: {dest_path} ({len(content)} bytes)")
                    return True
        except Exception as e:
            print(f"Failed {url}: {e}")
            time.sleep(1)

    print(f"FAILED to download: {dest_path} (ID: {file_id})")
    return False

def main():
    root_folder_id = '1dkxw_dQ4IL7O5OaK9tgXHNUxZqA6Kryz'
    output_base = '/app/applet/public/assets/case-studies'
    os.makedirs(output_base, exist_ok=True)

    print(f"Step 1: Inspecting root folder {root_folder_id}...")
    root_items = get_folder_items(root_folder_id)
    print(f"Found {len(root_items)} items in root folder.")

    main_folder_id = None
    for it in root_items:
        print(f"  Root item: {it['name']} ({it['id']})")
        if 'Ain_Sijam' in it['name'] or it['mime'] == 'application/vnd.google-apps.folder':
            main_folder_id = it['id']

    if not main_folder_id:
        print("Could not find main Ain_Sijam folder, using root.")
        main_folder_id = root_folder_id

    print(f"\nStep 2: Inspecting main package folder: {main_folder_id}...")
    package_items = get_folder_items(main_folder_id)
    print(f"Found {len(package_items)} items in package folder:")

    project_folders = []
    root_files = []

    for it in package_items:
        print(f"  {it['name']} ({it['mime']})")
        if it['mime'] == 'application/vnd.google-apps.folder':
            project_folders.append(it)
        else:
            root_files.append(it)

    # Download package-level files (catalog.json, project_lifecycle_ar.json, etc.)
    print("\nStep 3: Downloading package-level files...")
    for rf in root_files:
        dest = os.path.join(output_base, rf['name'])
        download_file(rf['id'], dest)

    # Download project folders
    print(f"\nStep 4: Processing {len(project_folders)} project folders...")
    total_downloaded = 0
    total_failed = []

    for pf in sorted(project_folders, key=lambda x: x['name']):
        p_name = pf['name']
        p_id = pf['id']
        p_dir = os.path.join(output_base, p_name)
        os.makedirs(p_dir, exist_ok=True)
        print(f"\n--- Project: {p_name} ({p_id}) ---")

        p_items = get_folder_items(p_id)
        print(f"  Found {len(p_items)} items in {p_name}")

        for item in p_items:
            if item['mime'] == 'application/vnd.google-apps.folder':
                subfolder_name = item['name']
                subfolder_id = item['id']
                subfolder_dir = os.path.join(p_dir, subfolder_name)
                os.makedirs(subfolder_dir, exist_ok=True)
                print(f"  Subfolder: {subfolder_name} ({subfolder_id})")

                sub_items = get_folder_items(subfolder_id)
                print(f"    Found {len(sub_items)} files in {subfolder_name}")
                for s_item in sub_items:
                    s_dest = os.path.join(subfolder_dir, s_item['name'])
                    ok = download_file(s_item['id'], s_dest)
                    if ok:
                        total_downloaded += 1
                    else:
                        total_failed.append(f"{p_name}/{subfolder_name}/{s_item['name']}")
                    time.sleep(0.2)
            else:
                dest = os.path.join(p_dir, item['name'])
                ok = download_file(item['id'], dest)
                if ok:
                    total_downloaded += 1
                else:
                    total_failed.append(f"{p_name}/{item['name']}")
                time.sleep(0.2)

    print("\n==========================================")
    print(f"Download complete! Successfully processed {total_downloaded} files.")
    if total_failed:
        print(f"Failed files ({len(total_failed)}):")
        for f in total_failed:
            print(f"  - {f}")
    else:
        print("ALL FILES DOWNLOADED SUCCESSFULLY WITH ZERO FAILURES!")

if __name__ == '__main__':
    main()
