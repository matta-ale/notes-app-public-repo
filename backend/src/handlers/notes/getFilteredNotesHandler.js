const { Note, Category } = require('../../db');
const { Op, literal } = require('sequelize');
const CustomError = require('../../utils/customError');

const getFilteredNotesHandler = async (data) => {
  const { isActive, category, UserId, page = 1, pageSize = 10 } = data;
  let filterCriteria = {};
  let orderArray = ['title', 'ASC'];
  const offset = (page - 1) * pageSize;

  if (isActive) filterCriteria.isActive = isActive;
  if (UserId) filterCriteria.UserId = UserId;
  try {
    const notes = await Note.findAndCountAll({
      where: filterCriteria,
      order: [orderArray],
      offset,
      limit: pageSize,
      include: {
        model: Category,
        as: 'Categories',
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
        ...(category !== 'all' && category !== undefined
          ? {
              where: {
                name: {
                  [Op.iLike]: `%${category}%`, // Adjust based on your needs
                },
              },
            }
          : {}),
      },
    });
    if (notes.rows.length === 0)
      throw new CustomError('No notes match that criteria', 404);
    const totalPages = Math.ceil(notes.count / pageSize);

    const pagination = {
      currentPage: page,
      pageSize: pageSize,
      totalItems: notes.count,
      totalPages: totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };

    return { data: notes.rows, pagination };
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};

module.exports = getFilteredNotesHandler;
