## About

This folder contains the source code for the github page associated with this repo.

The page is built using [Jekyll](https://jekyllrb.com/) SSG with [TeXt](https://kitian616.github.io/jekyll-TeXt-theme/docs/en/quick-start) theme.

## Development

#### Edit page's content

Edit `index.md` (French home page) or `index.en.md` (English page) to change the content. See the [documentation](https://kitian616.github.io/jekyll-TeXt-theme/docs/en/additional-styles) of the theme for special markdown syntax you can use.

#### Edit page's header

Edit `_includes/article-header.html` to change the header of the page. The template language used is [Liquid](https://shopify.github.io/liquid/).

#### Make changes to the TeXt theme

You can change TeXt theme defaults by overriding templates or styles in `\_includes` and `\_sass`. See the theme defaults at [TeXt's theme repo](https://github.com/kitian616/jekyll-TeXt-theme)

#### Automatic language redirection

The docs include a custom JavaScript redirect in `_includes/head/custom.html`.

- French is the default page at `/`.
- If the browser language is English (`en`, `en-US`, `en-GB`, etc.) and the user is on `/`, it redirects to `/en`.
- If the browser language is not English and the user is on `/en`, it redirects back to `/`.
- Query string and hash are preserved during redirection.

If you need to change this behavior, edit the redirect logic in `_includes/head/custom.html`.

#### Carousel

Uses the [Splide.js](https://splidejs.com/) javascript library hosted locally at `./assets/js/splide.min.js` and `./assets/css/splide.min.css`. 

## Structure

- `index.md` - Content of the French homepage in markdown.

- `index.en.md` - Content of the English page in markdown.

- `_config.yml` - Jekyll configuration.

- `Gemfile` - List of ruby dependencies, necessary for local preview of the site.

- `_data/` - Contains data loaded by Jekyll and TeXt theme in the form of yml.

- `_includes/` - Contains html template that will overrides the TeXt's theme default templates.

- `_sass/` - Contains scss files that will overrides TeXt's theme default styles.

- `_site/` - This is where the generated site will be placed.

- `assets/` - Assets (images, svg, gif, js...) used by the page.

- `assets/css/custom.css` - Custom css rules.

For more details on the roles of each folder see the Jekyll's [doc](https://jekyllrb.com/docs/structure/).

## Configuration

You can configure the page through the `_config.yml`

Some important options:

```yaml
# The name of the Jekyll theme
remote_theme: kitian616/jekyll-TeXt-theme

# The base hostname & protocol of the github page
url: https://nino-mau.github.io

# The base url of the site, should be the name of the repo and not the full url of the page
baseurl: /jekyll-demo3
```

## Local Preview

To preview the page locally:

1. Install ruby@3.1 on your machine

```bash
brew install ruby@3.1
```

2. Install Jekyll and Bundler using Ruby's package manager `gem` (installed with ruby by default)

```bash
gem install jekyll bundler
```

3. In the `docs/` folder, install the necessary dependencies with bundler

```bash
bundler config set path vendor/config
bundler install
```

4. Start the development server, visit [http://localhost:4000/](http://localhost:4000/) to preview the site.

```bash
bundle exec jekyll serve
```
