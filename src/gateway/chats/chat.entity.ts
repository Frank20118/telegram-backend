@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column({ nullable: true })
  title!: string;

  @ManyToMany(() => User, user => user.chats)
  members!: User[];

  @OneToMany(() => Message, message => message.chat)
  messages!: Message[];
}
