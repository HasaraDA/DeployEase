const express = require("express");
const bodyParser = require("body-parser");
const git = require("simple-git")();
const fs = require("fs");
const yaml = require("yamljs");
const path = require("path");

const app = express();

const REPO_DIR = "D:/Scripts/AWS-Playbooks/WebApp/AWS-Playbooks";
const YML_FILE = path.join(REPO_DIR, "vars.yml");
const REMOTE_URL = "https://github.com/HasaraDA/AWS-Playbooks";
const BRANCH = "v1.1";  // Set the branch to v1.1

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", async (req, res) => {
    const {
        user_email,
        instance_name,
        image,
        instance_type,
        keypair,
        region,
        security_group_id,
        subnet_id,
        vpc_id
    } = req.body;

    const data = {
        user_email,
        instance_name,
        image,
        instance_type,
        keypair,
        region,
        security_group_id,
        subnet_id,
        vpc_id,
    };

    try {
        if (!fs.existsSync(REPO_DIR)) {
            console.log(`Cloning the repository from ${REMOTE_URL}...`);
            await git.clone(REMOTE_URL, REPO_DIR);
        } else {
            await git.cwd(REPO_DIR);
        }

        // Ensure we are on the correct branch before pulling
        await git.checkout(BRANCH);
        
        // Pull latest changes from the v1.1 branch
        await git.pull("origin", BRANCH, {"--allow-unrelated-histories": null});

        // Write the updated data to the vars.yml file
        fs.writeFileSync(YML_FILE, yaml.stringify(data, 4), "utf8");

        // Add, commit, and push the changes to the v1.1 branch
        await git.add("vars.yml");
        await git.commit("Update vars.yml");
        await git.push("origin", BRANCH);
        
        res.send("Your order has been confirmed. An email with the server details will be sent to you shortly.");
    } catch (error) {
        res.send(`Error with Git operations: ${error.message}`);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
