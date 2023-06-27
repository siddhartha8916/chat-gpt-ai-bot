import { useRouter } from 'next/router';
import Link from 'next/link';

const CustomLink = ({ href, children, ...props }) => {
  const router = useRouter();
  let utmParams = ''
  let modifiedHref = href
  const { utm_source, utm_medium, utm_campaign } = router.query;

  if (utm_source || utm_medium || utm_campaign) {
    // Build the UTM parameters string
    utmParams = `utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}`;
    modifiedHref = href + (href.includes('?') ? `&${utmParams}` : `?${utmParams}`);
  }


  // Append UTM parameters to the href if they exist in the current URL

  return (
    <Link href={modifiedHref} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
