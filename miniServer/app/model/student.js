'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Student = app.model.define('student', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(100),
    age: INTEGER,
  }, {
    freezeTableName: true, // 直接查找设置的表名(student), 默认会加 s/es (students)
    timestamps: false, // 禁用自动添加 createdAt, updatedAt 字段行为
  });

  return Student;
};
