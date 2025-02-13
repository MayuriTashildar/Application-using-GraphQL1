const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const Booking = require("./models/Booking");

const BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    destination: { type: GraphQLString },
    date: { type: GraphQLString },
    travelers: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    bookings: {
      type: new GraphQLList(BookingType),
      resolve() {
        return Booking.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBooking: {
      type: BookingType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        destination: { type: GraphQLString },
        date: { type: GraphQLString },
        travelers: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const booking = new Booking(args);
        return await booking.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
