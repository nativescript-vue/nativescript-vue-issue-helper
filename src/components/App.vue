<template>
<div id="app" class="app">
  <AppHeader :lang="$lang" @change-lang="setLang"/>

  <div class="container">
    <form class="main-form" @submit.prevent="generate">
      <FormIntro/>

      <div class="common-fields vue-grid col-2 default-gap">
        <VueFormField
          :title="i18n('repo-title')"
          :subtitle="i18n('repo-subtitle')"
        >
          <VueSelect
            v-model="repo"
            class="button-nsvue"
          >
            <VueSelectButton
              v-for="option of repos"
              :key="option.id"
              :value="option.id"
              :label="option.name"
            />
          </VueSelect>
        </VueFormField>

        <VueFormField
          :title="i18n('type-title')"
        >
          <VueSelect
            v-model="type"
            class="button-nsvue"
          >
            <VueSelectButton
              v-for="option of types"
              :key="option.id"
              :value="option.id"
              :label="option.name"
            />
          </VueSelect>
        </VueFormField>

        <VueFormField
          class="span-2"
          :title="i18n('title-title')"
        >
          <VueInput
            v-model="title"
            required
            autofocus
            @blur="findIssues"
          />
          <template slot="subtitle">
            <div class="similar-issues" v-if="issues.length">
              {{ i18n('similar-issues') }}:

              <ul>
                <li v-for="issue in issues" :key="issue.id">
                  <a
                    class="issue"
                    :href="issue.html_url"
                    target="_blank"
                    rel="noreferrer"
                    tabindex="-1"
                  >
                    {{ issue.title }}
                  </a>
                </li>
              </ul>

              <p v-if="showIssueToggleControl">
                <span
                  v-if="!showingAllIssues"
                  role="button"
                  @click="showingAllIssues = true"
                >
                  {{ i18n('show-more') }}
                </span>
                <span
                  v-else
                  role="button"
                  @click="showingAllIssues = false"
                >
                  {{ i18n('show-less') }}
                </span>
              </p>
            </div>
          </template>
        </VueFormField>
      </div>

      <!-- content component -->
      <component :is="type" ref="content" :repo="repo"/>

      <div class="form-actions">
        <VueButton
          type="submit"
          class="primary big"
          :label="i18n('preview')"
        />
      </div>
    </form>

    <VueModal
      v-if="show"
      :title="i18n('preview-title')"
      class="medium"
      @close="show = false"
    >
      <div class="default-body" v-html="generated.html"/>

      <div slot="footer" class="actions">
        <VueButton
          class="primary big"
          :label="i18n('create')"
          @click="create()"
        />
      </div>
    </VueModal>
  </div>

  <footer class="app-footer">
    <p>&hellip;</p>
    <small>
      Built with
      <a href="https://github.com/vuejs/vue-cli">vue-cli</a>
      based on
      <a href="https://github.com/vuejs/vue-issue-helper">vue-issue-helper</a>
      &centerdot;
      Check out source on <a href="https://github.com/nativescript-vue/nativescript-vue-issue-helper">GitHub</a>
    </small>
  </footer>
</div>
</template>

<script >
import { repos } from '../config'
import { getQuery, updateQuery } from '../helpers'

import FormIntro from './FormIntro.vue'
import AppHeader from './AppHeader.vue'
import BugReport from './BugReport.vue'
import FeatureRequest from './FeatureRequest.vue'
import search from '../mixins/github-search'

export default {
  name: 'App',

  mixins: [search],

  components: {
    FormIntro,
    AppHeader,
    BugReport,
    FeatureRequest
  },

  data () {
    return {
      title: '',
      generated: {
        markdown: '',
        html: ''
      },
      show: false,
      preview: false,
      repo: '',
      repos,
      type: 'bug-report',
      versions: {},
    }
  },

  computed: {
    types () {
      return this.$lang && [
        { id: 'bug-report', name: this.i18n('bug-report') },
        { id: 'feature-request', name: this.i18n('feature-request') }
      ]
    }
  },

  watch: {
    repo (value) {
      updateQuery({ repo: value })
    },
  },

  created () {
    this.repo = getQuery().repo || 'nativescript-vue/nativescript-vue'
  },

  methods: {
    setLang (lang) {
      this.$lang = lang
      updateQuery({ lang })
    },

    findIssues () {
      this.issues = []
      if (this.title) {
        this.fetchIssues(this.title, { is: 'issue', repo: this.repo })
      }
    },

    generate () {
      this.generated = this.$refs.content.generate()
      this.show = true
    },

    create () {
      const title = encodeURIComponent(this.title).replace(/%2B/gi, '+')
      const body = encodeURIComponent(this.generated.markdown).replace(/%2B/gi, '+')
      const label = this.type === 'feature-request' ? '&labels=feature%20request' : ''
      window.open(`https://github.com/${this.repo}/issues/new?title=${title}&body=${body}${label}`)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../style/imports"

.container
  max-width $page-width
  margin 0 auto
  box-sizing border-box
  padding 0 24px

.common-fields
  margin-bottom 12px

.form-actions
  h-box()
  box-center()
  margin 24px 0

.app-footer
  text-align center
  margin 24px 0
</style>

<style>
  .vue-input:not(.flat) > .content,
  .button-nsvue .vue-button,
  .tooltip.popover .popover-inner,
  .vue-group-button.vue-button:not(.selected):not(.flat) {
    background: #f1f3f6 !important;
  }

  .vue-dropdown.open .dropdown-trigger .vue-group-button.vue-button:not(.selected):not(.flat):not(.ghost), .vue-group-button.vue-button:not(.selected):not(.flat):not(.ghost):hover {
    background: #e5e7ea !important;
  }
</style>