'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the cool ${chalk.red('generator-docker-playbook')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
        default: this.appname
      }
    ];

    return this.prompt(prompts).then(props => {
      props.secretKey = this._generateSecretKey();
      this.props = props;
    });
  }

  _generateSecretKey() {
    var choices = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    choices += '0123456789!#$%&()*+,-./:;<=>?@[]^_`{|}~';

    var secretKey = '';
    while (secretKey.length < 50) {
      secretKey += choices[Math.floor(Math.random() * choices.length)];
    }
    return secretKey; // .substr(0, 50);
  }

  writing() {
    var files = [
      'group_vars/all/vars.yml',
      'group_vars/all/vault.yml',
      'group_vars/dev.yml',
      'group_vars/prod.yml',
      'roles/projectName/defaults/main.yml',
      //'roles/projectName/files/',
      'roles/projectName/handlers/main.yml',
      'roles/projectName/meta/main.yml',
      'roles/projectName/tasks/docker.yml',
      'roles/projectName/tasks/main.yml',
      'roles/projectName/tasks/setup.yml',
      'roles/projectName/templates/docker-compose.yml.j2',
      'roles/projectName/templates/env.j2',
      'roles/projectName/tests/inventory',
      'roles/projectName/tests/test.yml',
      'roles/projectName/vars/main.yml',
      'roles/projectName/README.md',
      'ansible.cfg',
      'dev.yml',
      'inventory',
      'prod.yml',
      'requirements.yml',
    ];


    for (var i = 0; i < files.length; i++) {
      var templatePath = files[i];
      var destPath = templatePath;

      if (destPath.includes('projectName') === true) {
        destPath = destPath.replace(
            'projectName', this.props.projectName
        );
      }

      this.fs.copyTpl(
        this.templatePath(templatePath),
        this.destinationPath(destPath),
        this.props
      );
    }
  }

  install() {
    //this.installDependencies();
  }
};
