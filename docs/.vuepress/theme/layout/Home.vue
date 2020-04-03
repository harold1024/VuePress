<template>
  <div>
    <!-- <div
      class="home-bg"
      :style="{ 'background-image': 'url(' + $withBase(data.heroImage) + ')','background-repeat':'no-repeat','background-size':'cover' }"
    ></div>-->
    <div class="home-bg">
      <!-- <video autoplay loop :src="$withBase(data.heroImage)" style="width:100%">
      </video>-->
      <video
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-playsinline="true"
        playsinline="true"
        webkit-playsinline="true" 
        autoplay
        muted
        loop
        src="http://cdn.wenlong.ink/video/theme.mp4"
        style="width:100%"
      ></video>
      <div class="hero">
        <h1>{{ data.heroText || $title || 'Hello' }}</h1>

        <p class="description">
          {{ data.tagline || $description || 'Welcome to my VuePressBlog site' }}
        </p>

        <p class="action" v-if="data.actionText && data.actionLink">
          <NavLink class="action-button" :item="actionLink" />
        </p>

        <div class="easy-typed-box">
          {{ obj.output }}
          <span class="easy-typed-cursor">|</span>
        </div>
      </div>
    </div>

    <div class="home">
      <div class="features" v-if="data.features && data.features.length">
        <div class="feature" v-for="(feature, index) in data.features" :key="index">
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.details }}</p>
        </div>
      </div>

      <Content custom />

      <div class="footer" v-if="data.footer">{{ data.footer }}</div>
    </div>
  </div>
</template>

<script>
import NavLink from "../components/NavLink.vue";
import EasyTyper from 'easy-typer-js'

export default {
  components: { NavLink },

  computed: {
    data() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      };
    }
  },

  data() {
    return {
      obj: {
        output: '',
        isEnd: false,
        speed: 80,
        singleBack: false,
        sleep: 0,
        type: 'roolback',
        backSpeed: 40,
        sentencePause: false
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.fetchData()
    },
    fetchData() {
      // 一言Api进行打字机循环输出效果
      fetch('https://v1.hitokoto.cn').then(res => {
        return res.json()
      }).then(({ hitokoto }) => {
        this.initTyped(hitokoto)
      }).catch(err => {
        console.error(err)
      })
    },

    initTyped(input, fn, hooks) {
      const obj = this.obj
      const typed = new EasyTyper(obj, input, fn, hooks)
    }
  }
};
</script>

<style lang="stylus">
@import '../styles/config.styl';

.home-bg {
  position: relative;
  width: 100%;
  background-attachment: fixed;

  .hero {
    position: absolute;
    z-index 100;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;

    h1 {
      font-size: 4rem;
    }

    h1, .description, .action {
      margin: 5rem auto;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
      color: lighten($textColor, 40%);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: $accentColor;
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 1px solid darken($accentColor, 10%);

      &:hover {
        background-color: lighten($accentColor, 10%);
      }
    }
  }
}

.home {
  padding: $navbarHeight 2rem 0;
  max-width: 960px;
  margin: 0px auto;

  .features {
    border-top: 1px solid $borderColor;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 25%);
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-bg {
    .hero {
      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 0.8rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }
  }

  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}

.typed-cursor
    margin-left: 10px
    opacity: 1
    -webkit-animation: blink 0.7s infinite
    -moz-animation: blink 0.7s infinite
    animation: blink 0.7s infinite
  @keyframes blink
    0%
      opacity: 1
    50%
      opacity: 0
    100%
      opacity: 1
  
  @-webkit-keyframes blink
    0%
      opacity: 1
    50%
      opacity: 0
    100%
      opacity: 1
  
  @-moz-keyframes blink
    0%
      opacity: 1
    50%
      opacity: 0
    100%
      opacity: 1
</style>
