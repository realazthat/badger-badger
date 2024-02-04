# https://gist.github.com/mohanpedala/1e2ff5661761d3abd0385e8223e16425
set -e -x -v -u -o pipefail


GITHUB_PAGES_BRANCH=gh-pages
OUTPUTDIR=dist/

npm run build

# git subtree push --prefix dist origin gh-pages
ghp-import -n -p -f "${OUTPUTDIR}" -b "${GITHUB_PAGES_BRANCH}"

