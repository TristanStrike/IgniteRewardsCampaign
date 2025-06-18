# Development Workflow Guide

## 🌳 Branching Strategy

We follow a structured Git workflow designed for feature development and stable releases:

```
main              ←  Stable release candidates only
├── dev           ←  Integration branch for v1.0 development
│   ├── feature/deal-dropdown-enhancements
│   ├── feature/badge-config-v2
│   └── feature/analytics-dashboard
└── v0.1-stable   ←  Historical reference (protected)
```

### Branch Purposes

- **`main`**: Production-ready code and release candidates
- **`dev`**: Integration branch where all v1.0 features come together
- **`v0.1-stable`**: Frozen snapshot of v0.1 for historical reference
- **`feature/*`**: Short-lived branches for individual features

## 🚀 Feature Development Workflow

### 1. Starting a New Feature

```bash
# Always start from the latest dev branch
git checkout dev
git pull origin dev

# Create a new feature branch
git checkout -b feature/your-feature-name

# Examples:
git checkout -b feature/deal-dropdown-enhancements
git checkout -b feature/badge-config-v2
git checkout -b feature/user-authentication
git checkout -b feature/campaign-templates
```

### 2. Working on Your Feature

```bash
# Make your changes and commit regularly
git add .
git commit -m "feat(dropdown): add search functionality to deal selector"

# Push your branch to GitHub
git push -u origin feature/your-feature-name
```

### 3. Keeping Your Branch Updated

```bash
# Regularly sync with dev to avoid merge conflicts
git checkout dev
git pull origin dev
git checkout feature/your-feature-name
git merge dev

# Or use rebase for cleaner history
git checkout feature/your-feature-name
git rebase dev
```

### 4. Creating a Pull Request

1. Push your feature branch to GitHub
2. Go to the repository on GitHub
3. Click "Compare & pull request"
4. Set the pull request to merge into `dev` (not `main`)
5. Fill out the PR template with:
   - Clear description of changes
   - Screenshots/videos if UI changes
   - Testing instructions
   - Any breaking changes

### 5. After PR Review and Merge

```bash
# Clean up your local branches
git checkout dev
git pull origin dev
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

## 📝 Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/) for consistent, meaningful commit messages:

### Format
```
<type>(<scope>): <subject>

<body> (optional)

<footer> (optional)
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code changes that neither fix bugs nor add features
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependency updates, build changes, etc.)

### Examples

```bash
# Feature commits
git commit -m "feat(rewards): add multi-tier reward structure"
git commit -m "feat(ui): implement dark mode toggle"
git commit -m "feat(api): add campaign analytics endpoint"

# Bug fixes
git commit -m "fix(dates): resolve timezone handling bug"
git commit -m "fix(validation): prevent empty campaign names"

# Documentation
git commit -m "docs: update API documentation for campaigns"
git commit -m "docs: add deployment instructions to README"

# Refactoring
git commit -m "refactor(components): extract reusable form components"
git commit -m "refactor(utils): improve date formatting functions"

# With scope and body
git commit -m "feat(analytics): add campaign performance dashboard

- Add charts for campaign metrics
- Implement date range filtering
- Add export functionality for reports
- Include responsive design for mobile devices"
```

## 🔄 Pull Request Process

### PR Guidelines

1. **One feature per PR**: Keep PRs focused and reviewable
2. **Clear title**: Use conventional commit format for PR titles
3. **Detailed description**: Explain what, why, and how
4. **Screenshots**: Include visuals for UI changes
5. **Testing**: Describe how to test the changes
6. **Small PRs**: Aim for <400 lines of code when possible

### PR Template

```markdown
## 🎯 What does this PR do?
Brief description of the changes

## 🧪 How to test
Step-by-step instructions for testing

## 📸 Screenshots (if applicable)
Before/after images or videos

## ✅ Checklist
- [ ] Code follows our style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
- [ ] I have tested my changes locally
- [ ] Any dependent changes have been merged and published
```

### Review Process

1. **Self-review**: Review your own PR first
2. **Automated checks**: Ensure all CI checks pass
3. **Peer review**: At least one approval required
4. **Address feedback**: Make requested changes
5. **Merge**: Squash and merge to dev

## 🚀 Release Process

### Creating a Release

1. **Prepare release branch** (optional for major releases):
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b release/v1.0.0
   ```

2. **Update version numbers**:
   ```bash
   # Update package.json version
   npm version minor # or major/patch
   ```

3. **Create release PR to main**:
   - Open PR from `dev` to `main`
   - Title: "Release v1.0.0"
   - Include release notes and changelog

4. **After merge, create tag**:
   ```bash
   git checkout main
   git pull origin main
   git tag -a v1.0.0 -m "v1.0.0: Production-ready campaign platform with full feature set"
   git push origin v1.0.0
   ```

5. **Create GitHub release**:
   - Go to Releases on GitHub
   - Click "Create a new release"
   - Select the tag
   - Add release notes

## 🏷️ Version Tagging

### Semantic Versioning

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes (1.0.0 → 2.0.0)
- **MINOR**: New features, backward compatible (1.0.0 → 1.1.0)
- **PATCH**: Bug fixes, backward compatible (1.0.0 → 1.0.1)

### Tagging Commands

```bash
# Patch release (bug fixes)
git tag -a v1.0.1 -m "v1.0.1: Fix critical campaign creation bug"

# Minor release (new features)
git tag -a v1.1.0 -m "v1.1.0: Add campaign templates and analytics dashboard"

# Major release (breaking changes)
git tag -a v2.0.0 -m "v2.0.0: Complete UI overhaul with TypeScript migration"

# Push tags
git push origin --tags
```

## 🛠️ Common Commands Reference

### Daily Development

```bash
# Start working
git checkout dev && git pull origin dev

# Create feature branch
git checkout -b feature/my-feature

# Regular commits
git add . && git commit -m "feat(scope): add awesome feature"

# Push to GitHub
git push -u origin feature/my-feature

# Update from dev
git checkout dev && git pull origin dev
git checkout feature/my-feature && git merge dev
```

### Cleanup

```bash
# List all branches
git branch -a

# Delete local feature branch
git branch -d feature/completed-feature

# Delete remote feature branch
git push origin --delete feature/completed-feature

# Prune remote tracking branches
git remote prune origin
```

### Emergency Fixes

```bash
# Hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix

# After fix, create PR to both main and dev
# Then tag the hotfix release
git tag -a v1.0.1 -m "v1.0.1: Critical security fix"
```

## 🎯 Best Practices

### DO ✅
- Always branch from `dev` for new features
- Use descriptive branch names with prefixes
- Write clear, conventional commit messages
- Keep PRs small and focused
- Test your changes locally before pushing
- Update documentation when needed
- Clean up merged branches

### DON'T ❌
- Don't commit directly to `main` or `dev`
- Don't create PRs from outdated branches
- Don't ignore CI failures
- Don't merge your own PRs without review
- Don't leave TODO comments without tracking
- Don't commit secrets or sensitive data
- Don't push broken code

## 🆘 Troubleshooting

### Common Issues

**Merge conflicts**:
```bash
git checkout dev && git pull origin dev
git checkout feature/my-branch
git merge dev
# Resolve conflicts in your editor
git add . && git commit -m "resolve merge conflicts"
```

**Forgot to branch off dev**:
```bash
git checkout main
git checkout -b feature/my-feature  # Wrong!
# Fix:
git checkout dev
git checkout -b feature/my-feature-correct
git cherry-pick <commit-hash>  # Move your changes
```

**Need to update commit message**:
```bash
git commit --amend -m "new commit message"
# If already pushed:
git push --force-with-lease origin feature/my-branch
```

---

This workflow ensures code quality, team collaboration, and maintainable project history. When in doubt, ask the team! 🚀 