const { DataTypes } = require("sequelize");
const { sequelize } = require("./conn");
const Budget = require("./budgetModel");
const Bill = require("./billModel");

const BillDueDates = sequelize.define(
  "bill_due_date",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    budget_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "budgets",
        key: "id",
      },
    },
    bill_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "bills",
        key: "id",
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["due_date", "bill_id", "budget_id"],
      },
    ],
  },
  {
    timestamps: false,
  }
);

Budget.hasMany(BillDueDates, {
  foreignKey: "budget_id",
  //   onDelete: "CASCADE",
});

BillDueDates.belongsTo(Budget, {
  foreignKey: "budget_id",
});

Bill.hasMany(BillDueDates, {
  foreignKey: "bill_id",
  onDelete: "CASCADE",
});

BillDueDates.belongsTo(Bill, {
  foreignKey: "bill_id",
});

BillDueDates.sync({ alter: true });

module.exports = Bill;