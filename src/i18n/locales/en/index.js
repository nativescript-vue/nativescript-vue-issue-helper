module.exports = {
  _label: 'EN',

  // intro
  'intro': require('./intro.md').default,
  'intro-modal-title': 'The reason behind our strict issue policy',
  'intro-modal': require('./intro-modal.md').default,

  // bug report
  'repo-title': 'I am opening an issue for',
  'repo-subtitle': 'Please make sure to file the issue at appropriate repo.',
  'type-title': 'This is a',
  'title-title': 'Issue title',

  'version-title': 'Version',
  'version-subtitle': 'Check if the issue is reproducible with the latest stable version of Vue.',

  'repro-title': 'Link to minimal reproduction',
  'repro-subtitle': require('./repro-subtitle.md').default,
  'repro-modal-title': 'About Reproductions',
  'repro-modal': require('./repro-modal.md').default,

  'platform-and-os-title': 'Platform and OS info',
  'platform-and-os-subtitle': 'Please specify platform name & version, NativeScript version, OS name & version. Example: Android 7.0 / NativeScript 4.0 / Windows 10',

  'steps-title': 'Steps to reproduce',
  'steps-subtitle': require('./steps-subtitle.md').default,

  'expected-title': 'What is expected?',
  'actual-title': 'What is actually happening?',
  'extra-title': 'Any additional comments? (optional)',
  'extra-subtitle': 'e.g. some background/context of how you ran into this bug.',

  // feature request
  'rationale-title': 'What problem does this feature solve?',
  'rationale-subtitle': require('./rationale-subtitle.md').default,

  'proposal-title': 'What does the proposed API look like?',
  'proposal-subtitle': require('./proposal-subtitle.md').default,

  // preview
  'preview': 'Preview',
  'preview-title': 'Issue Preview',
  'create': 'Create',

  // misc
  'bug-report': 'Bug Report',
  'feature-request': 'Feature Request',
  'similar-issues': 'Similar issues',
  'show-more': 'Show more',
  'show-less': 'Show less',
  'drop-warn':
    `Unfortunately, image drop/uploading is not supported due to GitHub API ` +
    `limitations. However, you can create the issue first (which will take you ` +
    `to GitHub) and then drop the images needed.`
}
