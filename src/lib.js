import emptyDir from 'empty-dir';
import gitUserEmail from 'git-user-email';
import gitUserName from 'git-user-name';

export function isEmpty() {
  return emptyDir.sync(process.cwd());
}

export function guessEmail() {
  return gitUserEmail() || 'email@example.com';
}

export function guessUsername(email) {
  const matches = (email || guessEmail()).match(/^[^@]+/g);
  if (matches.length > 0) return matches[0];
  return 'some-username';
}

export function guessName() {
  const matches = process.cwd().match(/[^\/]+$/g);
  if (isEmpty() && matches.length > 0) return matches[0];
  return 'some-name';
}

export function guessAuthorName() {
  return gitUserName() || 'Some Name';
}

export function copy(yo) {
  return Promise.all([
    yo.fs.copyTpl(
      yo.templatePath('template/shared/_plugins/jekyll-plugin.rb'),
      yo.destinationPath(`_plugins/${yo.context.name}.rb`),
      { ...yo.context }
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/_posts'),
      yo.destinationPath('_posts')
    ),

    yo.fs.copy(
      yo.templatePath('template/shared/404.html'),
      yo.destinationPath('404.html')
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/Gemfile'),
      yo.destinationPath('Gemfile')
    ),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/LICENSE'),
      yo.destinationPath('LICENSE'),
      { ...yo.context }
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/Makefile'),
      yo.destinationPath('Makefile')
    ),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/README.md'),
      yo.destinationPath('README.md'),
      { ...yo.context }
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/_config.yml'),
      yo.destinationPath('_config.yml')
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/_editorconfig'),
      yo.destinationPath('.editorconfig')
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/_gitignore'),
      yo.destinationPath('.gitignore')
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/about.md'),
      yo.destinationPath('about.md')
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/index.md'),
      yo.destinationPath('index.md')
    ),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/jekyll-plugin.gemspec'),
      yo.destinationPath(`${yo.context.name}.gemspec`),
      { ...yo.context }
    ),
    yo.fs.copyTpl(
      yo.templatePath(`template/${yo.context.template}/lib/jekyll-plugin`),
      yo.destinationPath(`lib/${yo.context.name}`),
      { ...yo.context }
    ),
    yo.fs.copyTpl(
      yo.templatePath(`template/${yo.context.template}/lib/jekyll-plugin.rb`),
      yo.destinationPath(`lib/${yo.context.name}.rb`),
      { ...yo.context }
    )
  ]);
}
