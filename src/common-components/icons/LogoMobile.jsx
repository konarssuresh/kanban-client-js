const LogoMobile = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fillRule="evenodd">
      <rect width="6" height="25" rx="2" />
      <rect opacity=".75" x="9" width="6" height="25" rx="2" />
      <rect opacity=".5" x="18" width="6" height="25" rx="2" />
    </g>
  </svg>
);

export default LogoMobile;
