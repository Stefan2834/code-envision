const { GraphQLObjectType,
    GraphQLString,
} = require('graphql');


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        username: { type: GraphQLString },
    },
});




module.exports = {
    UserType,
}