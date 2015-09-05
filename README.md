A simple personal page website (and a place to experiment with new tools).

## Built with Gulp

GitHub Pages offers a powerful option for static-site generation with its [Jekyll][j] integration, but it currently lacks [Autoprefixer][a] support or any sort of live-reload.

[j]: http://jekyllrb.com/
[a]: http://github.com/postcss/autoprefixer

A lightweight (and educational, for me) alternative is a JS build-tool. There are a [ridiculous][grunt] [number][broccoli] [of][brunch] [options][mimosa], but [Gulp][g] seems to have the most developer momentum (though [Fly][f], a newcomer built with ES6 features, might be worth future consideration).

[grunt]: http://gruntjs.com
[broccoli]: http://broccolijs.com/
[brunch]: http://brunch.io/
[mimosa]: http://mimosa.io/
[g]: http://gulpjs.com/
[f]: http://github.com/flyjs/fly

#### Preprocessors
[Jade][ja] and [Stylus][s] provide concise, elegant syntax for HTML & CSS, and include extras like blocks and filters. [PostCSS][p] might be the future, but given its modular nature it's unclear how tools will support syntax highlighting, completion, etc.

> Sass [with libsass][css speed] would offer nearly identical syntax and compile faster, but using Stylus keeps the stack in the JS realm.

[ja]: http://jade-lang.com/
[s]: https://learnboost.github.io/stylus/
[p]: http://github.com/postcss/postcss
[css speed]: http://www.solitr.com/blog/2014/01/css-preprocessor-benchmark/

#### BrowserSync
[BrowserSync][bs] takes livereload into the future: no more external clients/browser-extensions, and the added ability to synchronize actions across multiple devices. Plus, it integrates seamlessly with Gulp.

[bs]: http://www.browsersync.io/

#### Other Bits
Performance-wise it makes sense to [inline small resources][bynens], so "production" builds are run through the aptly-named [inline-source][i], post-processing.

[bynens]: https://mathiasbynens.be/notes/inline-vs-separate-file
[i]: https://mathiasbynens.be/notes/inline-vs-separate-file

Finally, [gulp-newer][gn] allows Gulp to skip unmodified files, and    [gulp-gh-pages][ggp] allows for quick and easy GitHub Pages deployment.

[gn]: http://npm.im/gulp-newer
[ggp]: http://npm.im/gulp-gh-pages


## Structured Data

The ability to add [semantic data][semantic web] to a document is one of the best parts of HTML5, and this type of site is the perfect use for the Schema.org structure of [Person][p]. Of the supported markup, [RDFa][r] seems like the strongest choice—the syntax for [Microdata][m] is a bit obtuse (`itemprop`, `itemtype` vs `property`,`typeof`), and [JSON-LD][jld] is aimed more at machine-only data.

[semantic web]: http://en.wikipedia.org/wiki/Semantic_Web
[p]: http://schema.org/Person
[r]: http://en.wikipedia.org/wiki/RDFa
[m]: http://en.wikipedia.org/wiki/Microdata_(HTML)
[jld]: http://en.wikipedia.org/wiki/Microdata_(HTML)

One noteworthy benefit of adding semantic markup is in a search engine like Google, which uses structured data to show [extra details amongst search results][gsd], including photos and links to social profiles.

[gsd]: http://developers.google.com/structured-data/


## CloudFlare

Using a CDN has obvious performance benefits, but [CloudFlare][c] also provides a variety of nifty extra features, even on the free tier:

- [CNAME Root Domain][crd]: in order to dynamically route requests, cloud platforms (like GitHub Pages) require that domains be configured with a CNAME, not an A record. And a CNAME, per the RFC, requires some sort of subdomain. CloudFlare solves this by using its DNS magic to dynamically resolve root CNAME records into static IP addresses when queried.
- [Universal SSL][ussl]: CloudFlare provides SSL certificates to all customers. However, at the moment, GitHub Pages [only works with Flexible SSL][sorta ssl], meaning the connection between GitHub and CloudFlare servers is unecrypted. Not a huge risk, but worth noting.

[c]: http://www.cloudflare.com/
[crd]: http://blog.cloudflare.com/introducing-cname-flattening-rfc-compliant-cnames-at-a-domains-root/
[ussl]: http://blog.cloudflare.com/introducing-universal-ssl/
[sorta ssl]: https://konklone.com/post/github-pages-now-sorta-supports-https-so-use-it)

-------

#### TODO:

- add favicon.ico
- When browser-support for `object-fit` and `object-position` improves, revisit markup for `#photo`
- When Jade adds support for nested filters/js-transformers, remove the extra inline-source step
