import styles from './wrapper.styles'

const before = `<!doctype html>
<html>
 <head>
   <meta charset="utf-8">
   <style type="text/css">${styles}</style>
 </head>
 <body class="background-bg foreground-fg">
   <pre>
`

const after = `
   </pre>
 </body>
</html>
`

export {
  before,
  after
}
