const db = require("./index");

const runSeed = async () => {
    await db.sync({ force: true });
    console.log("Seed is complete");
    process.kill(0);
    //ends the process
}
runSeed();
//db.sync({ force: true })
// even if the table exists, it will overwrite what's there
// to recreate the table