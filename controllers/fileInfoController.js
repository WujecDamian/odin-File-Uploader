import { prisma } from "../lib/prisma.js";

const renderPage = async (req, res) => {
  const folder = await prisma.folder.findUnique({
    where: {
      id: Number(req.params.folderId),
    },
  });
  const file = await prisma.file.findUnique({
    where: {
      id: Number(req.params.fileId),
    },
  });
  res.render("fileInfo", { file, folder });
};

export default { renderPage };
