/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        gptGray:"#343541", //bg-gptGray
        gptBlack:"#202123",//bg-gptBlack
        gptLightGray:"#565869",//text-gptLightGray
        gptSlate:"#d9d9e3", //text-gptSlate
        gptWhite:"#c5c5d2",//text-gptWhite
        gptBorderColor:"#ffffff33"// border-gptBorderColor
     }
    },
  },
  plugins: [],
}
