import dotenv from "dotenv";
import app from "./src/app.js";
import seedAdmin from "./src/seed/adminSeed.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

await seedAdmin();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});