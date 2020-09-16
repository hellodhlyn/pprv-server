import {
  Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Member } from './member';

export enum PublishState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  DELETED = 'DELETED',
}

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, { eager: true })
  author: Member;

  @Column()
  authorReviewId: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  score: number;

  @Column()
  description: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  publishState: PublishState;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  reviewId(): string {
    return `@${this.author.username}/${this.authorReviewId}`;
  }

  static parseReviewId(reviewId: string): { username: string, authorReviewId: number } {
    const splits = reviewId.split('/');
    return { username: splits[0].replace('@', ''), authorReviewId: parseInt(splits[1], 10) };
  }
}
