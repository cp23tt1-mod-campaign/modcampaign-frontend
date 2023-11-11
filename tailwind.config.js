/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  mode: "jit",
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      'header-1': '32px',
      'header-2': '24px',
      'header-3': '20px',
      'header-4': '18px',
      'sub-header-1': '16px',
      'sub-header-2': '14px',
      'sub-header-3': '14px',
      'body-1': '12px',
      'body-2': '12px',
      'body-3': '12px',
      small: '10px',
    
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    extend: {
      colors: {
        red: '#FF0000',
        orange: '#FF7410',
        yellow: '#F9A407',
        'orange-2': '#FFE7D6',
        green: '#05AB58',
        blue: '#0274FE',
        black: '#000000',
        // 'black-2': rgba(0, 0, 0, 0.5),
        gray: '#929292',
        white: '#FFFFFF',
        bg: '#F5F5F5',
        'gray-2': '#ECECEC',
        // 'hover-primary': '#E35F30',
        // 'disable-primary': '#F9CEC0',
        // secondary: 'white',
        // 'new-secondary': '#2B3BA6',
        // tritery: 'linear-gradient(271.58deg, #8B1696 -53.77%, #FF5733 124.49%)',
        // background: {
        //   gray: '#FAFAFA'
        // },
        // 'gray-50': '#F9FAFB',
        // 'gray-200': '#EAECF0',
        // 'gray-300': '#D0D5DD',
        // 'gray-400': '#98A2B3',
        // 'gray-500': '#667085',
        // 'gray-600': '#475467',
        // 'gray-700': '#344054',
        // 'gray-900': '#101828',
        // clay: '#8B8B8B',
        // goldYellow: '#FFB001',
        // status: {
        //   active: '#5EBC00',
        //   success: '#12B76A',
        //   inactive: '#4759D6',
        //   end: '#99341F',
        //   error: '#D92D20',
        //   bgEnd: 'rgba(153, 52, 31, 0.25)',
        //   bgEndMobile: 'rgba(153, 52, 31, 0.10)'
        // },
      },
    },
  },
  plugins: [],
}

