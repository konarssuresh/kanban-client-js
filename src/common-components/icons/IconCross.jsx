const IconCross = ({ size = 16, ...props }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 16 16" {...props}>
    <path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 2 2 14M2 2l12 12"
    />
  </svg>
);

export default IconCross;
