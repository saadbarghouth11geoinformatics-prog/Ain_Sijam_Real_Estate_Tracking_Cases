# AI Implementation Prompt

You are already working inside the existing Ain Sijam platform. Add a new Arabic RTL section titled **نماذج متابعة التطور العقاري** using the supplied case-study package.

Read `catalog.json` first. Each project folder contains:

- `comparison_before_during_after.jpg`: the main card and detail-page comparison image.
- `satellite_images/`: three dated Sentinel-2 images.
- `project_data.json`: structured project information, dates, stages, sources, coordinates, and the tracking workflow.
- `case_study_ar.md`: Arabic portfolio copy.
- `sources.md`: official and satellite sources.

## Implementation requirements

1. Create a responsive portfolio grid containing the six projects from `catalog.json`.
2. Each card must show the project name, current status, location, and comparison thumbnail.
3. Open a project detail view or modal containing the three satellite stages in chronological order.
4. Show the exact acquisition date and cloud-cover percentage from `project_data.json` beneath each image.
5. Add an Arabic timeline for the seven tracking steps supplied in each project file.
6. Add a clearly visible sources section with clickable official links.
7. Display this disclosure on every project: **الصور الفضائية توثق التغير المرئي، بينما بيانات الملكية والتخصيص والتصاريح ونسب الإنجاز التعاقدية تُثبت من الوثائق الرسمية المرتبطة بسجل الأصل.**
8. Display the imagery attribution: **Contains modified Copernicus Sentinel data.**
9. Present these examples as public demonstration case studies unless the platform owner provides contracts proving they were delivered client projects.
10. Preserve the existing design system, colors, typography, Arabic RTL behavior, routes, APIs, maps, and current functionality.
11. Do not invent permit numbers, government approvals, ownership records, completion percentages, clients, contracts, or investment values.
12. Do not describe a project as fully complete when its supplied status says that development is continuing.

Use the existing framework and components. Implement the section directly in the current project and test desktop, tablet, and mobile layouts.
