const IconHideSidebar = ({ size = 18, ...props }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 18 16" {...props}>
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2 1h12c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V2c0-.6.4-1 1-1Zm3 0v14m8-14v14M2 8h12"
    />
  </svg>
);

export default IconHideSidebar;
