// Vercel Serverless Function: Fetch LinkedIn profile and recent posts
// Requires environment variable: LINKEDIN_ACCESS_TOKEN

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) return res.status(500).json({ error: 'LINKEDIN_ACCESS_TOKEN not configured' });

  try {
    const headers = { Authorization: `Bearer ${token}`, 'X-Restli-Protocol-Version': '2.0.0' };

    // Basic profile: firstName, lastName, id
    const profileRes = await fetch('https://api.linkedin.com/v2/me', { headers });
    if (!profileRes.ok) throw new Error(`Profile fetch failed: ${profileRes.status}`);
    const profile = await profileRes.json();

    // Email address
    const emailRes = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', { headers });
    const email = emailRes.ok ? await emailRes.json() : null;

    // Recent user-generated content (UGC Posts)
    // Note: requires r_ugc or relevant scope; fallback to empty array if not accessible
    let posts = [];
    try {
      const postsRes = await fetch(`https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${encodeURIComponent('urn:li:person:' + profile.id)})&sortBy=LAST_MODIFIED&count=5`, { headers });
      if (postsRes.ok) posts = await postsRes.json();
    } catch (e) {
      // ignore posts errors
    }

    return res.status(200).json({ profile, email, posts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || String(err) });
  }
};
