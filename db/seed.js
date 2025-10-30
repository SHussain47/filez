import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  // folders
  const folders = ["Documents", "Images", "Backups"];
  for (const name of folders) {
    await db.query("INSERT INTO folders (name) VALUES ($1) ON CONFLICT DO NOTHING", [name]);
  }

  // 5 files per folder
  const files = [
    // Documents
    ["report.pdf", 1200000, "Documents"],
    ["resume.docx", 85000, "Documents"],
    ["notes.txt", 4000, "Documents"],
    ["contract.pdf", 2000000, "Documents"],
    ["presentation.pptx", 5500000, "Documents"],
    // Images
    ["vacation.jpg", 3000000, "Images"],
    ["screenshot.png", 800000, "Images"],
    ["logo.svg", 120000, "Images"],
    ["banner.jpeg", 1500000, "Images"],
    ["icon.ico", 30000, "Images"],
    // Backups
    ["db.dump", 45000000, "Backups"],
    ["archive.tar.gz", 12000000, "Backups"],
    ["config.json", 3000, "Backups"],
    ["keys.zip", 500000, "Backups"],
    ["restore.sh", 2000, "Backups"],
  ];

  for (const [name, size, folder] of files) {
    await db.query(
      `INSERT INTO files (name, size, folder_id)
       SELECT $1, $2, id FROM folders WHERE name = $3
       ON CONFLICT DO NOTHING`,
      [name, size, folder]
    );
  }
}
