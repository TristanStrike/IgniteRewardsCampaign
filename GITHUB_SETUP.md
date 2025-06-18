# GitHub Repository Setup Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Fill in the repository details:
   - **Repository name**: `IgniteRewardsCampaign`
   - **Description**: `A modern, intuitive campaign creation platform built with React and Vite for designing and managing rewards campaigns.`
   - **Visibility**: Choose Public or Private as per your preference
   - **Initialize this repository with**: 
     - ✅ Do NOT check "Add a README file" (we already have one)
     - ✅ Do NOT check "Add .gitignore" (we already have one)
     - ✅ CHECK "Choose a license" and select "MIT License"

4. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you setup instructions. Use these commands:

```bash
# Add the remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/IgniteRewardsCampaign.git

# Verify the remote was added correctly
git remote -v

# Push the main branch
git push -u origin main

# Push the v0.1-stable branch
git checkout v0.1-stable
git push -u origin v0.1-stable

# Push the dev branch
git checkout dev
git push -u origin dev

# Push the version tag
git push origin v0.1.0

# Return to dev branch for development
git checkout dev
```

## Step 3: Verify Repository Structure

After pushing, your GitHub repository should have:
- ✅ `main` branch (stable release candidates)
- ✅ `dev` branch (v1.0 development)
- ✅ `v0.1-stable` branch (historical reference)
- ✅ `v0.1.0` tag
- ✅ README.md with comprehensive documentation
- ✅ .gitignore for React/Vite/Node.js
- ✅ MIT License
- ✅ v1-roadmap.md with development plan

## Step 4: Set Default Branch (Optional)

If you want `dev` to be the default branch for new pull requests:

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Click "Branches" in the left sidebar
4. Under "Default branch", click the edit button
5. Select `dev` as the default branch
6. Click "Update"

## Step 5: Branch Protection Rules (Recommended)

To enforce pull request workflow:

1. Go to repository "Settings" → "Branches"
2. Click "Add rule" next to "Branch protection rules"
3. For `main` branch:
   - Branch name pattern: `main`
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

4. Repeat for `dev` branch with similar settings

## Commands Summary

Here are the exact commands to run after creating the GitHub repository:

```bash
# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/IgniteRewardsCampaign.git

# Push all branches and tags
git push -u origin main
git checkout v0.1-stable && git push -u origin v0.1-stable
git checkout dev && git push -u origin dev
git push origin v0.1.0

# Set dev as your working branch
git checkout dev
```

## Next Steps

1. Delete this file after setup: `rm GITHUB_SETUP.md`
2. Update README.md to replace "yourusername" with your actual GitHub username
3. Start your first feature branch: `git checkout -b feature/your-feature-name`

Your repository is now ready for professional development! 🚀 