#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const copyFeature = require('../utils/copyUtils');
const chalk = require('chalk');

const presets = {
  Minimal: {
    db: 'None',
    auth: false,
    docker: false,
    testing: false,
    linting: false
  },
  Standard: {
    db: 'MongoDB',
    auth: false,
    docker: false,
    testing: true,
    linting: true
  },
  Full: {
    db: 'MongoDB',
    auth: true,
    docker: true,
    testing: true,
    linting: true
  }
};

(async () => {
  console.log(chalk.cyan.bold('\n🚀 urmil-backend-starter\n'));

  const { projectName, preset } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '📁 Project name:',
      default: 'my-app'
    },
    {
      type: 'list',
      name: 'preset',
      message: '🧩 Choose a preset or customize features:',
      choices: ['Minimal', 'Standard', 'Full', 'Custom']
    }
  ]);

  let config = presets[preset] || {};

  if (preset === 'Custom') {
    config = await inquirer.prompt([
      {
        type: 'list',
        name: 'db',
        message: '🗄️ Choose a database setup:',
        choices: ['None', 'MongoDB']
      },
      {
        type: 'confirm',
        name: 'auth',
        message: '🔐 Include JWT Auth module?',
        default: false
      },
      {
        type: 'confirm',
        name: 'docker',
        message: '🐳 Include Docker support?',
        default: false
      },
      {
        type: 'confirm',
        name: 'testing',
        message: '🧪 Include Jest testing setup?',
        default: true
      },
      {
        type: 'confirm',
        name: 'linting',
        message: '🧼 Include ESLint + Prettier config?',
        default: true
      }
    ]);
  }

  const targetDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.error(chalk.red(`❌ Directory "${projectName}" already exists.`));
    process.exit(1);
  }

  console.log(chalk.green('📁 Creating project folder...'));
  fs.mkdirSync(targetDir);

  console.log(chalk.green('📦 Copying base template...'));
  fs.copySync(path.join(__dirname, '..', 'template/base'), targetDir);

  // Copy selected features
  if (config.db === 'MongoDB') {
    console.log(chalk.green('🗄️ Adding MongoDB support...'));
    copyFeature('db-mongo', targetDir);
  }

  if (config.auth) {
    console.log(chalk.green('🔐 Adding JWT Auth...'));
    copyFeature('auth', targetDir);
  }

  if (config.docker) {
    console.log(chalk.green('🐳 Adding Docker setup...'));
    copyFeature('docker', targetDir);
  }

  if (config.testing) {
    console.log(chalk.green('🧪 Adding testing setup...'));
    copyFeature('testing', targetDir);
  }

  if (config.linting) {
    console.log(chalk.green('🧼 Adding ESLint + Prettier...'));
    copyFeature('lint', targetDir);
  }

  // Run npm install
  console.log(chalk.cyan('\n📦 Installing dependencies...\n'));
  process.chdir(targetDir);
  execSync('npm install', { stdio: 'inherit' });

  console.log(chalk.green.bold(`\n🎉 "${projectName}" is ready!`));
  console.log(chalk.cyan(`👉 cd ${projectName} && npm run dev`));
})();
