const lightColors = {
  white: {
    1: "#fff",
    2: "#f7f7f7",
    3: "#eee",
    4: "#ddd",
    5: "#ccc",
  },
  black: {
    1: "#888888",
    2: "#777",
    3: "#555",
    4: "#333",
    5: "#191919",
    5: "#000",
  },
};

const darkColors = {
  black: {
    1: "#fff",
    2: "#f7f7f7",
    3: "#eee",
    4: "#ddd",
    5: "#aaa",
  },
  white: {
    1: "#111",
    2: "#222",
    3: "#444",
    4: "#333",
    5: "#555",
  },
  dark: {
    main: "#fff",
    light: "#fff",
    dark: "#ddd",
    text: "#000",
  },
  light: {
    main: "#000",
    light: "#555",
    dark: "#333",
    text: "#fff",
  },
  textSecondary: {
    main: "#bbb",
    light: "#999",
  },

  secondary: {
    main: "#F55",
    light: "#a33",
    dark: "#900",
    text: "#fff",
  },
  purple: {
    main: "#815",
    light: "#f4d",
    dark: "#a06",
    text: "#fff",
  },
};

export default function colors(theme) {
  const dynamicColors = theme === "dark" ? darkColors : lightColors;
  return {
    primary: {
      main: "#407BFF",
      light: "#407BFF",
      dark: "#407BFF",
      text: "#fff",
    },
    secondary: {
      main: "#407BFF",
      light: "#407BFF",
      dark: "#407BFF",
      text: "#fff",
    },
    purple: {
      main: "#a09",
      light: "#f4d",
      dark: "#a06",
      text: "#fff",
    },
    light: {
      main: "#fff",
      light: "#fff",
      dark: "#ddd",
      text: "#000",
    },
    dark: {
      main: "#000",
      light: "#555",
      dark: "#222",
      text: "#fff",
    },
    textSecondary: {
      main: "#999",
      light: "#aaa",
    },
    blue: {
      main: "#07E",
      light: "#39f",
      dark: "#028",
      text: "#fff",
    },
    info: {
      main: "#83B0CB",
      light: "#3af",
      dark: "#08a",
      text: "#fff",
    },
    success: {
      main: "#0a4",
      text: "#fff",
      light: "#5c3",
      dark: "#062",
    },
    warning: {
      main: "#fa2",
      light: "#fc7",
      dark: "#f90",
      text: "#fff",
    },
    error: {
      main: "#f31",
      text: "#fff",
      light: "#f43",
      dark: "#a20",
    },
    ...dynamicColors,
  };
}
