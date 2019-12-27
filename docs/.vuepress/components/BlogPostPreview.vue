<script>
export default {
    name: 'BlogPostPreview',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        formatPublishDate() {
            const dateFormat = new Date(this.item.frontmatter.date)
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            } 

            return dateFormat.toLocaleDateString('en-US', options)
        }
    }
}
</script>

<template>
    <div class="blog-w">
        <section class="blog-section">
            <h3 class="blog-post__title">{{ item.frontmatter.title }}</h3>
            <p class="blog-post__excerpt" v-if="item.frontmatter.excerpt">{{ item.frontmatter.excerpt }}</p>
            <p v-if="item.readingTime">Estimated time: {{ item.readingTime.text }}</p>
            <time class="blog-post__time">{{ formatPublishDate }}</time>
            <router-link class="button blog-post__button" :to="item.path">Read More ></router-link>
        </section>
    </div>
</template>

<style scoped>
.blog-post__button {
	margin-bottom: 1.5rem;
	display: inline-block;
}

.blog-post__title {
	margin-top: 0.5rem;
    color: #fff;
}

.blog-post__excerpt{
    color: #fff;
    max-width: 320px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.button {
    background: #32c8cf;
	border: 1px solid #32c8cf;
	border-radius: 4px;
	color: #fff;
	font-size: 0.8rem;
	padding: 0.3rem 0.75rem;
	text-transform: uppercase;
	font-weight: 700;
	box-shadow: 0 0;
	transition: background-color 0.2s ease-in, color 0.2s ease-in;
}

.tag-list {
    list-style: none;
    padding-left: 0;
    display: flex;
    margin-bottom: 25px;
}

.tag-list__item {
    margin-left: 10px;
}

.tag-list__item:first-child {
    margin-left: 0;
}

.tag-list__btn {
    padding: 5px;
    font-size: 0.9rem;
    background-color: #fff;
}
.blog-post__time{
    color: #fff;
    font-size: 12px;
}
</style>
