set -e
npm run build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:harold1024/vuepress.git master:gh-pages
cd -