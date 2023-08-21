//import inquirer and fs
const inquirer = require('inquirer')
const fs = require('fs')

// array of questions for user
const questions = [
    {
        name: 'title',
        message: 'What is the title of your ReadMe/Project?',
        validate: (value) => { if (value) { return true } else { return 'Please enter a title to continue' } },
    },
    {
        type: 'checkbox',
        name: 'features',
        message: 'What would you like to include in the ReadMe?',
        choices: ['Description','Table of Contents','Installation', 'Usage', 'Contribution', 'Tests', 'Questions'],
    },
    {
        type: 'editor',
        name: 'description',
        message: 'How would you describe your Project? (Will open an editor, make sure to save before closing!))',
        when: (answers) => answers.features.includes('Description'),
    },
    {
        type: 'editor',
        name: 'installation',
        message: 'What instructions do you want to provide for installation? (Will open an editor, make sure to save before closing!)',
        when: (answers) => answers.features.includes('Installation'),
    },
    {
        type: 'editor',
        name: 'usage',
        message: 'What usage info would you like to provide? (Will open an editor, make sure to save before closing!)',
        when: (answers) => answers.features.includes('Usage'),
    },
    {
        type: 'editor',
        name: 'contribution',
        message: 'What guidelines would you like to set about contribution? (Will open an editor, make sure to save before closing!)',
        when: (answers) => answers.features.includes('Contribution'),
    },
    {
        type: 'editor',
        name: 'test',
        message: 'What test instructions would you like to provide? (Will open an editor, make sure to save before closing!)',
        when: (answers) => answers.features.includes('Tests'),
    },
    {
        type: 'list',
        name: 'license',
        message: 'What license would you like to use?',
        choices: ['MIT', 'Apache', 'GPL', 'BSD', 'None'],
    },
    {
        name: 'github',
        message: 'What is your GitHub username?',
        when: (answers) => answers.features.includes('Questions'),
    },
    {
        name: 'email',
        message: 'What is your email address?',
        when: (answers) => answers.features.includes('Questions'),
    },
]

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log('Success!')
    )
}

// function to initialize program
function init() {
    //prompt user with questions
    inquirer.prompt(questions).then((response) => {
        let readMe = `# ${response.title}\n\n` //Title
        readMe += `![License](https://img.shields.io/badge/License-${response.license}-blue.svg)\n\n` //License badge
        if (response.description) readMe += `## Description\n\n${response.description}\n` //Description
        //Table of contents
        if (response.features.includes('Table of Contents')) var tableOfContents = true
        if (tableOfContents) readMe += `\n## Table of Contents\n\n`
        if (response.installation && tableOfContents) readMe += `* [Installation](#installation)\n`
        if (response.usage && tableOfContents) readMe += `* [Usage](#usage)\n`
        if (response.license !== 'None' && tableOfContents) readMe += `* [License](#license)\n`
        if (response.contribution && tableOfContents) readMe += `* [Contributing](#contributing)\n`
        if (response.test && tableOfContents) readMe += `* [Tests](#tests)\n`
        if (response.github || response.email && tableOfContents) readMe += `* [Questions](#questions)\n`
        //Sections
        if (response.installation) readMe += `## Installation\n\n${response.installation}\n\n`
        if (response.usage) readMe += `## Usage\n\n${response.usage}\n`
        if (response.license !== 'None') readMe += `\n## License\n\nThis project is covered under the ${response.license} license.\n\n`
        if (response.contribution) readMe += `## Contributing\n\n${response.contribution}\n\n`
        if (response.test) readMe += `## Tests\n\n${response.test}\n\n`
        if (response.github || response.email) readMe += `## Questions\n\nYou can use my contact info below to reach me with any questions. I'll do my best to get back to you as soon as possible!\n\n`
        if (response.github) readMe += `GitHub: [${response.github}](https://github.com/${response.github})\n\n`
        if (response.email) readMe += `Email: [${response.email}](mailto:${response.email})\n\n`
        writeToFile('README.md', readMe)
    })
}

// Function call to initialize app
init();