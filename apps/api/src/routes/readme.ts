import express, { Request, Response } from "express";

const router = express.Router();

// Type for route parameters
interface ReadmeParams {
  user: string;
  repo: string;
}

router.get(
  "/:user/:repo",
  async (req: Request<ReadmeParams>, res: Response) => {
    const { user, repo } = req.params;

    try {
      // Try to fetch from main branch first
      let url = `https://raw.githubusercontent.com/${user}/${repo}/main/README.md`;
      let response = await fetch(url);
      

      // If main doesn’t exist, fall back to master
      if (!response.ok) {
        url = `https://raw.githubusercontent.com/${user}/${repo}/master/README.md`;
        response = await fetch(url);
      }

      if (!response.ok) {
        return res
          .status(response.status)
          .json({ error: `Could not fetch README from ${url}` });
      }

      const markdown = await response.text();
      res.json({ readme: markdown });
    } catch (err) {
      console.error("Error fetching README:", err);
      res.status(500).json({ error: "Server error fetching README" });
    }
  }
);

export default router;
