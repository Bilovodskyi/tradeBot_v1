"use server";

import { exec } from "child_process";
import path from "path";

export async function startIBGateway() {
    const scriptPath = path.join("bin/run.sh");
    const configPath = path.join("root/conf.yaml");

    const command = `${scriptPath} ${configPath}`;
    exec(
        command,
        { cwd: "/Users/bohdanbilovodskyi/Downloads/clientportal" },
        (error, stdout, stderr) => {
            if (error) {
                console.log(`Error executing the command: ${error.message}`);
                return;
            }

            if (stderr) {
                console.log(`Error output: ${stderr}`);
            }

            console.log(`Output: ${stdout}`);
        }
    );
}
