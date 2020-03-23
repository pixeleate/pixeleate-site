require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Pixeleate`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
          resolve: `gatsby-remark-vscode`,
          // All options are optional. Defaults shown here.
          options: {
            theme: 'Dark+ (default dark)', // Read on for list of included themes. Also accepts object and function forms.
            wrapperClassName: '',   // Additional class put on 'pre' tag. Also accepts function to set the class dynamically.
            injectStyles: true,     // Injects (minimal) additional CSS for layout and scrolling
            extensions: [],         // Third-party extensions providing additional themes and languages
            languageAliases: {},    // Map of custom/unknown language codes to standard/known language codes
            replaceColor: x => x,   // Function allowing replacement of a theme color with another. Useful for replacing hex colors with CSS variables.
            getLineClassName: ({    // Function allowing dynamic setting of additional class names on individual lines
              content,              //   - the string content of the line
              index,                //   - the zero-based index of the line within the code fence
              language,             //   - the language specified for the code fence
              meta                  //   - any options set on the code fence alongside the language (more on this later)
            }) => '',
            logLevel: 'warn'       // Set to 'info' to debug if something looks wrong
          }
        }]
      }
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
      },
    },
  ],
}
