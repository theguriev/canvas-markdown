export const list = ({
    token,
    parser,
    ...rest
}) => parser({
    ...rest,
    tokens: token.items,
    parser,
    parent: token
})
