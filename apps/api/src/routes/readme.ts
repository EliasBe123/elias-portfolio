import express, { Request, Response } from "express";

const router = express.Router();

interface ReadmeParams {
  user: string;
  repo: string;
}

router.get(
  "/:user/:repo",
  async (req: Request<ReadmeParams>, res: Response) => {
    const { user, repo } = req.params;

    try {
      let lastStatus = 404;

      for (const branch of ["main", "master"]) {
        const rawBaseUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/`;
        const response = await fetch(`${rawBaseUrl}README.md`);
        lastStatus = response.status;

        if (!response.ok) continue;

        const readme = await response.text();
        res.set("Cache-Control", "public, max-age=300");
        return res.json({
          readme,
          branch,
          rawBaseUrl,
          githubBaseUrl: `https://github.com/${user}/${repo}/blob/${branch}/`,
        });
      }

      return res.status(lastStatus).json({ error: "Could not fetch README" });
    } catch (err) {
      console.error("Error fetching README:", err);
      res.status(500).json({ error: "Server error fetching README" });
    }
  }
);

export default router;
