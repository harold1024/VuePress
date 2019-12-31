<script>
export default {
  name: "BlogPostList",
  props: {
    pages: {
      type: Array,
      default: []
    },
    pageSize: {
      type: Number,
      default: 5
    },
    startPage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentPage: Math.ceil(this.startPage / this.pageSize),
      selectedTags: []
    };
  },
  computed: {
    filteredList() {
      if (this.pages) {
        return this.pages
          .filter(item => {
            const isBlogPost = !!item.frontmatter.blog;
            const isReadyToPublish =
              new Date(item.frontmatter.date) <= new Date();
            // check for locales
            let isCurrentLocale = true;
            if (this.$site.locales) {
              const localePath = this.$route.path.split("/")[1] || "";
              isCurrentLocale = item.relativePath.startsWith(localePath);
            }
            // check if tags contain all of the selected tags
            const hasTags =
              !!item.frontmatter.tags &&
              this.selectedTags.every(tag =>
                item.frontmatter.tags.includes(tag)
              );

            if (
              !isBlogPost ||
              !isReadyToPublish ||
              (this.selectedTags.length > 0 && !hasTags) ||
              !isCurrentLocale
            ) {
              return false;
            }

            return true;
          })
          .sort(
            (a, b) =>
              new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
          );
      }
    },

    totalPages() {
      return Math.ceil(this.filteredList.length / this.pageSize);
    }
  },

  mounted() {
    console.log(this.filteredList);
    this.currentPage = Math.min(
      Math.max(this.currentPage, 0),
      this.totalPages - 1
    );
  },

  methods: {
    nextPage() {
      this.currentPage =
        this.currentPage >= this.totalPages - 1
          ? this.totalPages - 1
          : this.currentPage + 1;
    },
    previousPage() {
      this.currentPage = this.currentPage < 0 ? 0 : this.currentPage - 1;
    },
    addTag(tag) {
      const tagExists = this.selectedTags.some(item => {
        return item === tag;
      });

      if (!tagExists) {
        this.selectedTags = this.selectedTags.concat(tag);
      }
    },
    removeTag(tag) {
      this.selectedTags.filter(t => t != tag);
    },
    resetTags() {
      this.selectedTags = [];
    }
  }
};
</script>

<template>
  <div>
    <div v-if="selectedTags.length > 0" class="filtered-heading">
      <h2>Filtered by {{ selectedTags.join(',') }}</h2>
      <button type="button" @click="resetTags" class="btn clear-filter-btn">Clear filter</button>
    </div>
    <ul class="blog-list">
      <li
        v-for="(item, index) in filteredList"
        class="blog-list__item"
        :style="{ 'background-image': 'url(/VuePress' + item.frontmatter.heroImage + ')','background-repeat':'no-repeat','background-size':'cover' }"
      >
        <BlogPostPreview
          v-show="index >= currentPage * pageSize && index < (currentPage + 1) * pageSize"
          :item="item"
        />
        <ul class="blog-list__tags">
          <li v-for="tag in item.frontmatter.tags" style="list-style-type: none">
            <div class="blog-item__tags" @click="addTag(tag)">{{ tag }}</div>
          </li>
        </ul>
      </li>
    </ul>

    <div class="pagination">
      <button
        v-show="currentPage > 0"
        @click="previousPage"
        class="button--pagination"
        type="button"
      >Previous</button>
      <button
        v-show="currentPage < totalPages - 1"
        @click="nextPage"
        class="button--pagination"
        type="button"
      >Next</button>
    </div>
  </div>
</template>

<style scoped lang="stylus">
@import '../theme/styles/config.styl';
.blog-list {
  padding: 3.6rem 1rem 0;
  max-width: 1080px;
  margin: 0px auto;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid $borderColor;
  align-items: flex-start;
  align-content: stretch;
  justify-content: space-between;
}

.blog-list__item {
  list-style-type: none !important;
  text-align: center;

  border-radius: 10px;
  box-shadow: 0 15px 15px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
  background-color: #eaeaea;
  margin-top: 20px;

  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
  transition: all ease-in-out 0.5s;

  flex-grow: 1;
  flex-basis: 30%;
  max-width: 32%;
}


@media (max-width: $MQMobile) {
    .blog-list {
      flex-direction: column;
    }

    .blog-list__item {
      max-width: 100%;
      padding: 0 2.5rem;
    }
}

@media (max-width: $MQMobileNarrow) {
    .feature {
      h2 {
        font-size: 1.25rem;
      }
  }
}

.blog-list__item:hover {
  -webkit-filter: grayscale(0);
  -moz-filter: grayscale(0);
  -ms-filter: grayscale(0);
  -o-filter: grayscale(0);
  filter: grayscale(0);
  filter: gray;
  transform: scale(1.1);
}

.blog-list__tags {
  margin-bottom: 15px;
  display: flex;
}
.blog-item__tags {
    height: 20px;
    padding: 0 5px;
    font-size: 12px;
    border-radius: 10px;
    line-height: 20px;
    color: #32c8cf;
    margin-right: 10px;
    border: 1px solid #32c8cf;
}

.button--pagination {
  background-color: #32c8cf;
  border-radius: 4px;
  color: #fff;
  font-size: 0.8rem;
  padding: 0.5rem 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  box-shadow: 0 0;
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
}

.button--pagination:hover {
  background-color: #fff;
  border: 1px solid #32c8cf;
  border-radius: 4px;
  color: #32c8cf;
}

.clear-filter-btn {
  align-self: center;
  margin-left: 20px;
}

.filtered-heading {
  display: flex;
}

.pagination {
  text-align: center;
}
</style>
