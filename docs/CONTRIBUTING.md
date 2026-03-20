# OPERATION `BYTE_BRAWLER`: Contribution Guide

### 1. Fork the repository
Create a fork of this github repo to your own account.
### 2. Create a Branch
Create a new branch for your changes.
```bash
git checkout -b feature/your-feature-name
```
Use clear branch names, such as:
- ``feature/health-bar-impl``
- ``bugfix/enemy-hitbox``
- ``docs/readme-update``
### 3. Make Your Changes
- Follow the project's **[code style / formatting rules](./PROGRAMMING_GUIDE.md)**
- Keep code readable and consistent
- Avoid unrelated changes in the same commit
- Comment complex logic when necessary

### 4. Test Your Changes
Before Submitting:
- Run the game locally
- Make sure there is no runtime errors
- Ensure existing features still work as expected
### 5. Commit Your Changes
Write clear and meaningful commit messages.

**GOOD EXAMPLE**
```txt
feat(map): add new dungeon biome
docs: add new section to readme
chore(npm): update vite to 8.0.0
fix: fixed crash when entering settings
```

**PLACEHOLDERS**
```txt
feat:
fix:
docs:
style:
refactor:
performance:
test:
chore:

|=-=-=-=-=-=-=-=-=-=--=|
|=-=-= PARAMETERS =-=-=|
|=-=-=-=-=-=-=-=-=-=--=|

feat():
fix():
docs():
style():
refactor():
performance():
test():
chore():
```

**HERE IS WHAT NOT TO DO:**
```txt
update
fix a thing
changes
```

### 6. Open a Pull Request
When opening a PR:
- Clearly explain what your changes do
- Reference any related issue if applicable
- Keep the description short and clear

Your pull request may be reviewed and requested to be adjusted before merging.

## Code Guidelines
If you didn't read the **[Programming Style Guide](./PROGRAMMING_GUIDE.md)**, then heres a basic break down of whats in it, and what you would need to follow.

- Use descriptive variable and function names (when needed)
- Avoid deeply nested logic
- Keep files focused and organized

If a file is under 50 lines, comments are optional, unless the logic is complex.

## What NOT to Contribute
**Please Avoid:**
- Breaking existing functionality
- Adding unused dependencies
- Large refactors without discussion
- Hardcoding tokens, secrets, or private data

**Any pull request containing sensitive data will be rejected immediately.**

## Reporting Bugs or Suggestions
If you find a bug or have a suggestion:
- Open an issue
- Clearly describe the problem or idea
- Include steps to reproduce if reporting a bug

## Final Notes
This project is meant to be simple, clean and easy to build upon.
Contributions that improve the games, functionality, and readability are always appreciated

**Thank you for contributing! ദ്ദി◝ ⩊ ◜)**