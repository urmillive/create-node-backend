#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const projectName = process.argv[2];

if (!projectName) {
  console.error('❌ Please provide a project name.');
  process.exit(1);
}

const targetPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, '..', 'template');

fs.copySync(templatePath, targetPath);

console.log('✅ Template copied!');

process.chdir(targetPath);
execSync('npm install', { stdio: 'inherit' });

console.log('🚀 Project ready!');
