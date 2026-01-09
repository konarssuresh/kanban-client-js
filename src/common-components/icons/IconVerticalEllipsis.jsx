const IconVerticalEllipsis = ({ size = 5, ...props }) => (
  <svg
    width={size}
    height={size * 4}
    fill="currentColor"
    viewBox="0 0 5 20"
    {...props}
  >
    <circle cx="2.5" cy="2.5" r="2.5" />
    <circle cx="2.5" cy="10" r="2.5" />
    <circle cx="2.5" cy="17.5" r="2.5" />
  </svg>
);

export default IconVerticalEllipsis;
