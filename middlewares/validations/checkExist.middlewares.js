const checkExist = (Model) => async (req, res, next) => {
  const { id } = req.params;
  const detail = await Model.findByPk(id);
  if (detail) {
    next();
  } else {
    res.status(404).send("Not Found!");
  }
};

module.exports = { checkExist };
