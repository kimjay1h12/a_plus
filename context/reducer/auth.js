export default function auth(state, { type, payload }) {
  switch (type) {
    case "LOADING":
      return { ...state, loading: true, error: null };

    case "SUCCESS":
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        error: null,
        data: { ...payload },
      };
    case "Error":
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: null,
        data: { ...payload },
      };
    default:
      return state;
  }
}
