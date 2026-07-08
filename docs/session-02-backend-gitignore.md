A .gitignore file tells Git which files and folders should never be tracked.

We created a .gitignore file in the root of the project.

Example:

# Dependencies
node_modules/

# Environment variables
.env

# Logs
*.log

# Flutter
.dart_tool/
build/

# VS Code
.vscode/



What .gitignore Does

Git checks this file before adding files to version control.

If a file or folder matches a rule in .gitignore, Git ignores it.

Example:

node_modules/

means:

Ignore every folder named node_modules.

Important Lesson

.gitignore only affects new, untracked files.

If Git is already tracking a file, adding it to .gitignore will not stop Git from tracking it automatically.








git status
git add .
git commit -m "your message"
git push


git checkout -b project-structure

This:

Creates a new branch.
Switches to that branch.

git branch

Example output:

main
* project-structure

The * shows the branch you're currently working on.




git push -u origin project-structure

After that, simply use:

git push