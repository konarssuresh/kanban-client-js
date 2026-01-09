const IconLightTheme = ({ size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 16 16"
    {...props}
  >
    <path d="M8 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1Zm0 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-2a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1ZM3 11a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1Z" />
  </svg>
);

export default IconLightTheme;
