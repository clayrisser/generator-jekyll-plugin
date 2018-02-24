import 'babel-polyfill';
import _ from 'lodash';
import Generator from 'yeoman-generator';
import moment from 'moment';
import optionOrPrompt from 'yeoman-option-or-prompt';
import path from 'path';
import {
  copy,
  guessEmail,
  guessUsername,
  guessName,
  guessAuthorName,
  isEmpty
} from './lib';

module.exports = class extends Generator {
  initializing() {
    if (this.options.destination)
      this.destinationRoot(this.options.destination);
    this.context = {
      moment
    };
    this.optionOrPrompt = optionOrPrompt;
  }

  async prompting() {
    let { name } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project Name:',
        default: guessName()
      }
    ]);
    if (!/^jekyll-/.test(name)) {
      name = `jekyll-${name}`;
    }
    const { description, version, license } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'description',
        message: 'Project Description:',
        default: `The awesome ${name} project`
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: '0.0.1'
      },
      {
        type: 'input',
        name: 'license',
        message: 'License:',
        default: 'MIT'
      }
    ]);
    const { authorName, authorEmail } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'authorName',
        message: 'Author Name:',
        default: guessAuthorName()
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author Email:',
        default: guessEmail()
      }
    ]);
    const { authorUrl } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'authorUrl',
        message: 'Author URL:',
        default: `https://${guessUsername(authorEmail)}.com`
      }
    ]);
    const {
      homepage,
      repository,
      template,
      install
    } = await this.optionOrPrompt([
      {
        type: 'input',
        name: 'homepage',
        message: 'Homepage:',
        default: `https://github.com/${guessUsername(authorEmail)}/${name}`
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Repository:',
        default: `https://github.com/${guessUsername(authorEmail)}/${name}`
      },
      {
        type: 'list',
        name: 'template',
        message: 'Template',
        choices: ['generator'],
        default: 'generator'
      },
      {
        type: 'confirm',
        name: 'install',
        message: 'Install dependencies',
        default: true
      }
    ]);
    const moduleName = _.upperFirst(_.camelCase(name));
    this.answers = {
      authorEmail,
      authorName,
      authorUrl,
      description,
      homepage,
      install,
      license,
      moduleName,
      name,
      repository,
      template,
      version
    };
    this.context = { ...this.context, ...this.answers };
  }

  configuring() {
    if (!this.options.destination && !isEmpty()) {
      this.destinationRoot(path.resolve(this.answers.name));
    }
  }

  default() {}

  writing() {
    return copy(this);
  }

  conflicts() {}

  install() {
    const install = this.options.install
      ? this.options.install[0].toLowerCase()
      : 'y';
    if (!this.answers.install || install === 'n' || install === 'f')
      return false;
    return true;
  }

  end() {}
};
