# IgniteRewardsCampaign

A modern, intuitive campaign creation platform built with React and Vite for designing and managing rewards campaigns.

## 🚀 Features

- **Campaign Objective Setup**: Define campaign goals and target metrics
- **Reward Structure Configuration**: Create flexible reward tiers and incentives  
- **Campaign Dates & Tracking**: Schedule campaigns with start/end dates
- **Campaign Review**: Preview and finalize campaign settings
- **Progress Visibility**: Monitor and display campaign progress (coming in v1.0)

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Build Tool**: Vite 5
- **Styling**: CSS3 with custom styling
- **Code Quality**: ESLint with React plugins

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/IgniteRewardsCampaign.git
cd IgniteRewardsCampaign
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173/`

## 📁 Project Structure

```
IgniteRewardsCampaign/
├── src/
│   ├── pages/
│   │   ├── CampaignObjective.jsx
│   │   ├── RewardStructure.jsx
│   │   ├── CampaignDatesTracking.jsx
│   │   ├── ReviewCampaign.jsx
│   │   └── ProgressVisibility.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── README.md
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint code analysis
- `npm run preview` - Preview production build locally

## 🌟 Version History

### v0.1 (Current - Stable)
- Core campaign creation workflow
- Campaign objective configuration
- Reward structure setup
- Date and tracking configuration
- Campaign review functionality

### v1.0 (In Development)
See [v1-roadmap.md](./v1-roadmap.md) for upcoming features and improvements.

## 🤝 Contributing

We follow a structured branching model:

- `main` - Stable release candidates
- `dev` - Integration branch for v1.0 development  
- `v0.1-stable` - Historical reference for v0.1
- `feature/*` - Short-lived feature branches

### Development Workflow

1. Create feature branch from `dev`
2. Make your changes
3. Open Pull Request to `dev`
4. After review, merge to `dev`
5. Release candidates are merged from `dev` to `main`

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples**:
- `feat(rewards): add multi-tier reward structure`
- `fix(dates): resolve timezone handling bug`
- `docs: update setup instructions`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check existing [Issues](https://github.com/yourusername/IgniteRewardsCampaign/issues)
2. Create a new issue with detailed description
3. For urgent matters, contact the development team

## 🔮 Roadmap

This project is actively developed. Check our [v1-roadmap.md](./v1-roadmap.md) for upcoming features and the development timeline.

---

**Built with ❤️ by the IgniteRewardsCampaign team** 