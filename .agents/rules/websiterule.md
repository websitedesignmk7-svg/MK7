---
trigger: always_on
---

# MK7 Website Builder — AUTOPILOT PROTOCOL

## 1. MANDATORY OPERATIONAL RULES
- **FULL AUTONOMY:** Execute all commands and scripts directly in the terminal. Do NOT ask for permission or show "Proposed Changes" pop-ups.
- **BATCH PROCESSING:** Once a table (e.g., ALASKA) is triggered, you MUST fetch ALL rows with Status = "Not started". Process them one by one in a loop. Do NOT stop until the "Not started" list is empty.
- **HELPER STORAGE:** Save any temporary scripts (.js or .py) inside `.agents/scripts/`. Keep the root `MK7/` folder clean.

## 2. WORKFLOW STEPS
### STEP 1: PREPARE ENVIRONMENT
- Create a `.gitignore` file in the root directory if it doesn't exist.
- Add these lines to `.gitignore`: `*.js`, `*.md`, `.agents/`, `node_modules/`.

### STEP 2: BUILD BATCH (THE LOOP)
For EACH store with Status = "Not started":
1. Read template from `C:\Users\Mouad\Desktop\MK7\index.html`.
2. Fetch data from Notion (Store Name, Phone, Socials, Images, etc.).
3. Generate the new HTML (Apply rules: tel links, no empty sections, etc.).
4. Create folder `C:\Users\Mouad\Desktop\MK7\[Store_Name_With_Underscores]`.
5. Save `index.html` in that folder.
6. Update Notion Status to "In review".
7. **CONTINUE IMMEDIATELY** to the next "Not started" store.

### STEP 3: GITHUB SYNC
Once ALL stores are processed:
1. Open terminal in `C:\Users\Mouad\Desktop\MK7\`.
2. Run: `git add .` (The .gitignore will filter out scripts/rules automatically).
3. Run: `git commit -m "[Table_Name] Batch Completed"`.
4. Run: `git push origin main`.

### STEP 4: LIVE LINKS
For each store in the completed batch:
1. Construct URL: `https://websitedesignmk7-svg.github.io/MK7/` + `Folder_Name`.
2. Paste URL into the Notion "website" property.

## 3. TRIGGER COMMANDS
- "Build websites for the [TABLE NAME] table" -> Start the Autopilot Loop.