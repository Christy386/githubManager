const { exec } = require('child_process');

export default function handler(req, res) {

    const gitRepoPath = '../repositories/testRepository';
    const commitMessage = 'test';
    const remoteRepoName = 'origin';
    const branchToPush = 'dev2';

    const shell = `
        git --git-dir=${gitRepoPath}/.git --work-tree=${gitRepoPath} add .
        git --git-dir=${gitRepoPath}/.git --work-tree=${gitRepoPath} commit -m "${commitMessage}"
        git --git-dir=${gitRepoPath}/.git --work-tree=${gitRepoPath} push ${remoteRepoName} ${branchToPush}
    `
    // Execute the Git command to get the list of modified files
    exec(shell, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            console.log(stdout);
            res.status(200).json({
                response: "erro",
                err:error
            });
            return;
        }else{
            console.log(stdout);
            res.status(200).json({
                response: "commited"
            });
        }
    });

    
}